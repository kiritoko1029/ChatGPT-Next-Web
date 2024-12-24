import React, { useEffect, useRef, useMemo, useState, Fragment } from "react";
import { useWebSocket } from "../hooks/useWebSocket";
import styles from "./home.module.scss";

import { IconButton } from "./button";
import SettingsIcon from "../icons/settings.svg";
import GithubIcon from "../icons/github.svg";
import ChatGptIcon from "../icons/chatgpt.svg";
import AddIcon from "../icons/add.svg";
import DeleteIcon from "../icons/delete.svg";
import MaskIcon from "../icons/mask.svg";
import DragIcon from "../icons/drag.svg";
import DiscoveryIcon from "../icons/discovery.svg";
import CopyIcon2 from "../icons/copy2.svg";
import ReloadIcon2 from "../icons/reload2.svg";
import Locale from "../locales";

import { useAccessStore, useAppConfig, useChatStore } from "../store";

import {
  DEFAULT_SIDEBAR_WIDTH,
  MAX_SIDEBAR_WIDTH,
  MIN_SIDEBAR_WIDTH,
  NARROW_SIDEBAR_WIDTH,
  Path,
  PLUGINS,
  REPO_URL,
} from "../constant";

import { Link, useNavigate } from "react-router-dom";
import { isIOS, useMobileScreen } from "../utils";
import dynamic from "next/dynamic";
import { showConfirm, Selector } from "./ui-lib";
import clsx from "clsx";

const ChatList = dynamic(async () => (await import("./chat-list")).ChatList, {
  loading: () => null,
});
export function useHotKey() {
  const chatStore = useChatStore();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey) {
        if (e.key === "ArrowUp") {
          chatStore.nextSession(-1);
        } else if (e.key === "ArrowDown") {
          chatStore.nextSession(1);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });
}

export function useDragSideBar() {
  const limit = (x: number) => Math.min(MAX_SIDEBAR_WIDTH, x);

  const config = useAppConfig();
  const startX = useRef(0);
  const startDragWidth = useRef(config.sidebarWidth ?? DEFAULT_SIDEBAR_WIDTH);
  const lastUpdateTime = useRef(Date.now());

  const toggleSideBar = () => {
    config.update((config) => {
      if (config.sidebarWidth < MIN_SIDEBAR_WIDTH) {
        config.sidebarWidth = DEFAULT_SIDEBAR_WIDTH;
      } else {
        config.sidebarWidth = NARROW_SIDEBAR_WIDTH;
      }
    });
  };

  const onDragStart = (e: MouseEvent) => {
    // Remembers the initial width each time the mouse is pressed
    startX.current = e.clientX;
    startDragWidth.current = config.sidebarWidth;
    const dragStartTime = Date.now();

    const handleDragMove = (e: MouseEvent) => {
      if (Date.now() < lastUpdateTime.current + 20) {
        return;
      }
      lastUpdateTime.current = Date.now();
      const d = e.clientX - startX.current;
      const nextWidth = limit(startDragWidth.current + d);
      config.update((config) => {
        if (nextWidth < MIN_SIDEBAR_WIDTH) {
          config.sidebarWidth = NARROW_SIDEBAR_WIDTH;
        } else {
          config.sidebarWidth = nextWidth;
        }
      });
    };

    const handleDragEnd = () => {
      // In useRef the data is non-responsive, so `config.sidebarWidth` can't get the dynamic sidebarWidth
      window.removeEventListener("pointermove", handleDragMove);
      window.removeEventListener("pointerup", handleDragEnd);

      // if user click the drag icon, should toggle the sidebar
      const shouldFireClick = Date.now() - dragStartTime < 300;
      if (shouldFireClick) {
        toggleSideBar();
      }
    };

    window.addEventListener("pointermove", handleDragMove);
    window.addEventListener("pointerup", handleDragEnd);
  };

  const isMobileScreen = useMobileScreen();
  const shouldNarrow =
    !isMobileScreen && config.sidebarWidth < MIN_SIDEBAR_WIDTH;

  useEffect(() => {
    const barWidth = shouldNarrow
      ? NARROW_SIDEBAR_WIDTH
      : limit(config.sidebarWidth ?? DEFAULT_SIDEBAR_WIDTH);
    const sideBarWidth = isMobileScreen ? "100vw" : `${barWidth}px`;
    document.documentElement.style.setProperty("--sidebar-width", sideBarWidth);
  }, [config.sidebarWidth, isMobileScreen, shouldNarrow]);

  return {
    onDragStart,
    shouldNarrow,
  };
}
export function SideBarContainer(props: {
  children: React.ReactNode;
  onDragStart: (e: MouseEvent) => void;
  shouldNarrow: boolean;
  className?: string;
}) {
  const isMobileScreen = useMobileScreen();
  const isIOSMobile = useMemo(
    () => isIOS() && isMobileScreen,
    [isMobileScreen],
  );
  const { children, className, onDragStart, shouldNarrow } = props;
  return (
    <div
      className={clsx(styles.sidebar, className, {
        [styles["narrow-sidebar"]]: shouldNarrow,
      })}
      style={{
        // #3016 disable transition on ios mobile screen
        transition: isMobileScreen && isIOSMobile ? "none" : undefined,
      }}
    >
      {children}
      <div
        className={styles["sidebar-drag"]}
        onPointerDown={(e) => onDragStart(e as any)}
      >
        <DragIcon />
      </div>
    </div>
  );
}

export function SideBarHeader(props: {
  title?: string | React.ReactNode;
  subTitle?: string;
  logo?: React.ReactNode | string;
  children?: React.ReactNode;
  shouldNarrow?: boolean;
}) {
  const { title, subTitle, logo, children, shouldNarrow } = props;
  let logoComp;
  if (typeof logo === "string") {
    logoComp = (
      <img
        className={styles["sidebar-logo"] + " no-dark"}
        style={{ width: "45px" }}
        src={logo}
      ></img>
    );
  } else {
    logoComp = (
      <div className={styles["sidebar-logo"] + " no-dark"}>{logo}</div>
    );
  }
  return (
    <Fragment>
      <div
        className={clsx(styles["sidebar-header"], {
          [styles["sidebar-header-narrow"]]: shouldNarrow,
        })}
        data-tauri-drag-region
      >
        <div className={styles["sidebar-title-container"]}>
          <div className={styles["sidebar-title"]} data-tauri-drag-region>
            {title}
          </div>
          <SubTitle />
        </div>
        {logoComp}
      </div>
      {children}
    </Fragment>
  );
}

// Hitokoto Tooltip Component
const HitokotoTooltip = ({
  showCopied,
  onRefresh,
  onCopy,
  children,
}: {
  showCopied: boolean;
  onRefresh: () => void;
  onCopy: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const tooltipStyle = {
    position: "absolute",
    top: "-32px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "rgba(0,0,0,0.8)",
    color: "white",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    display: "flex",
    gap: "8px",
    whiteSpace: "nowrap",
    zIndex: 1000,
    transition: "all 0.3s",
  } as const;

  return (
    <div
      style={{
        fontSize: "13px",
        position: "relative",
        cursor: "pointer",
        padding: "4px",
        borderRadius: "4px",
        transition: "all 0.3s",
        backgroundColor: isHovering ? "rgba(0,0,0,0.05)" : "transparent",
      }}
      className="hitokoto-container"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const isInTooltipArea = e.clientY < rect.top - 40;
        if (!isInTooltipArea) {
          setIsHovering(false);
        }
      }}
    >
      <div onClick={onRefresh} style={{ marginBottom: "2px" }}>
        {children}
      </div>
      <div
        style={{
          ...tooltipStyle,
          opacity: showCopied ? 1 : 0,
          visibility: showCopied ? "visible" : "hidden",
          pointerEvents: "none",
        }}
      >
        {Locale.Hitokoto.CopySuccess}
      </div>
      <div
        className="action-tooltip"
        style={{
          ...tooltipStyle,
          opacity: isHovering && !showCopied ? 1 : 0,
          visibility: isHovering && !showCopied ? "visible" : "hidden",
          pointerEvents: isHovering && !showCopied ? "auto" : "none",
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <span
          onClick={(e) => {
            e.stopPropagation();
            onRefresh();
          }}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <ReloadIcon2 style={{ width: "14px", height: "14px" }} />{" "}
          {Locale.Hitokoto.Actions.Refresh}
        </span>
        <span style={{ color: "#666" }}>|</span>
        <span
          onClick={(e) => {
            e.stopPropagation();
            onCopy(e);
          }}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <CopyIcon2 style={{ width: "14px", height: "14px" }} />{" "}
          {Locale.Hitokoto.Actions.Copy}
        </span>
      </div>
      <style jsx>{`
        .action-tooltip {
          pointer-events: none;
        }
        .action-tooltip span {
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
};

const SubTitle = function SubTitle(props: {}) {
  const [hitokoto, setHitokoto] = useState("");
  const [hitokoto_from, setHitokoto_from] = useState("");
  const [from_who, setFrom_who] = useState("");
  const [showCopied, setShowCopied] = useState(false);
  const refreshed = useRef(false);
  const { hitokotoUrl } = useAccessStore();
  const onlineUsers = useWebSocket();

  const copyHitokoto = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `${hitokoto}${hitokoto_from ? ` —— ${hitokoto_from}` : ""}${
      from_who ? ` ${from_who}` : ""
    }`;

    try {
      // 首先尝试使用现代的 Clipboard API
      await navigator.clipboard.writeText(text);
    } catch (err) {
      // 如果 Clipboard API 失败，使用传统的方法
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        document.body.removeChild(textarea);
      } catch (e) {
        console.error("复制失败:", e);
        document.body.removeChild(textarea);
        return;
      }
    }

    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 1000);
  };

  function fetchHitokoto() {
    refreshed.current = true;
    fetch(hitokotoUrl).then((res) => {
      res.json().then((data) => {
        setHitokoto(data.hitokoto);
        setFrom_who(data.from_who);
        setHitokoto_from(data.from);
      });
    });
  }

  useEffect(() => {
    if (hitokotoUrl) {
      fetchHitokoto();
    }
  }, [hitokotoUrl]);

  return (
    <div className={styles["sidebar-sub-title"]}>
      <div
        style={{
          fontSize: "12px",
          color: "#888",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          marginBottom: "4px",
        }}
      >
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: onlineUsers > 0 ? "#4CAF50" : "#ccc",
            marginRight: "2px",
          }}
        />
        {Locale.Hitokoto.OnlineCount(onlineUsers)}
      </div>
      <HitokotoTooltip
        showCopied={showCopied}
        onRefresh={fetchHitokoto}
        onCopy={copyHitokoto}
      >
        {hitokoto}
        <span style={{ color: "#888" }}>
          {hitokoto_from ? ` —— ${hitokoto_from}` : ""} {from_who}
        </span>
      </HitokotoTooltip>
    </div>
  );
};

export function SideBarBody(props: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) {
  const { onClick, children } = props;
  return (
    <div className={styles["sidebar-body"]} onClick={onClick}>
      {children}
    </div>
  );
}

export function SideBarTail(props: {
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
}) {
  const { primaryAction, secondaryAction } = props;

  return (
    <div className={styles["sidebar-tail"]}>
      <div className={styles["sidebar-actions"]}>{primaryAction}</div>
      <div className={styles["sidebar-actions"]}>{secondaryAction}</div>
    </div>
  );
}

export function SideBar(props: { className?: string }) {
  useHotKey();
  const { onDragStart, shouldNarrow } = useDragSideBar();
  const [showPluginSelector, setShowPluginSelector] = useState(false);
  const navigate = useNavigate();
  const config = useAppConfig();
  const chatStore = useChatStore();
  const { title, headerLogoUrl } = useAccessStore();
  return (
    <SideBarContainer
      onDragStart={onDragStart}
      shouldNarrow={shouldNarrow}
      {...props}
    >
      <SideBarHeader
        title={title}
        subTitle=""
        logo={headerLogoUrl !== "" ? headerLogoUrl : <ChatGptIcon />}
        shouldNarrow={shouldNarrow}
      >
        <div className={styles["sidebar-header-bar"]}>
          <IconButton
            icon={<MaskIcon />}
            text={shouldNarrow ? undefined : Locale.Mask.Name}
            className={styles["sidebar-bar-button"]}
            onClick={() => {
              if (config.dontShowMaskSplashScreen !== true) {
                navigate(Path.NewChat, { state: { fromHome: true } });
              } else {
                navigate(Path.Masks, { state: { fromHome: true } });
              }
            }}
            shadow
          />
          <IconButton
            icon={<DiscoveryIcon />}
            text={shouldNarrow ? undefined : Locale.Discovery.Name}
            className={styles["sidebar-bar-button"]}
            onClick={() => setShowPluginSelector(true)}
            shadow
          />
        </div>
        {showPluginSelector && (
          <Selector
            items={[
              ...PLUGINS.map((item) => {
                return {
                  title: item.name,
                  value: item.path,
                };
              }),
            ]}
            onClose={() => setShowPluginSelector(false)}
            onSelection={(s) => {
              navigate(s[0], { state: { fromHome: true } });
            }}
          />
        )}
      </SideBarHeader>
      <SideBarBody
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            navigate(Path.Home);
          }
        }}
      >
        <ChatList narrow={shouldNarrow} />
      </SideBarBody>
      <SideBarTail
        primaryAction={
          <>
            <div className={clsx(styles["sidebar-action"], styles.mobile)}>
              <IconButton
                icon={<DeleteIcon />}
                onClick={async () => {
                  if (await showConfirm(Locale.Home.DeleteChat)) {
                    chatStore.deleteSession(chatStore.currentSessionIndex);
                  }
                }}
              />
            </div>
            <div className={styles["sidebar-action"]}>
              <Link to={Path.Settings}>
                <IconButton
                  aria={Locale.Settings.Title}
                  icon={<SettingsIcon />}
                  shadow
                />
              </Link>
            </div>
            <div className={styles["sidebar-action"]}>
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                <IconButton
                  aria={Locale.Export.MessageFromChatGPT}
                  icon={<GithubIcon />}
                  shadow
                />
              </a>
            </div>
          </>
        }
        secondaryAction={
          <IconButton
            icon={<AddIcon />}
            text={shouldNarrow ? undefined : Locale.Home.NewChat}
            onClick={() => {
              if (config.dontShowMaskSplashScreen) {
                chatStore.newSession();
                navigate(Path.Chat);
              } else {
                navigate(Path.NewChat);
              }
            }}
            shadow
          />
        }
      />
    </SideBarContainer>
  );
}
