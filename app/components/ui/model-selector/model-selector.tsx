import { Drawer, Input, ConfigProvider } from "antd";
import styles from "./model-selector.module.scss";
import { useState, useMemo } from "react";
import { SearchOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { ProviderAvatar } from "../model-avatar";

export interface ModelType {
  name: string;
  displayName: string;
  available: boolean;
  provider?: {
    providerName: string;
  };
  sorted?: number;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  models: ModelType[];
  title?: string;
  defaultModel?: string;
  defaultProvider?: string;
  onSelection: (model: ModelType) => void;
}

// 获取模型的唯一标识
const getModelKey = (model: ModelType) => {
  return `${model.name}@${model?.provider?.providerName || "OpenAI"}`;
};

export const ModelSelector = (props: Props) => {
  const {
    visible,
    onClose,
    models,
    title = "Models",
    defaultModel,
    defaultProvider,
    onSelection,
  } = props;
  const [searchText, setSearchText] = useState("");

  // 按provider分���并处理搜索
  const groupedModels = useMemo(() => {
    if (!searchText) {
      // 如果没有搜索文本，按provider分组显示所有模型
      return models.reduce((groups: Record<string, ModelType[]>, model) => {
        const provider = model?.provider?.providerName || "OpenAI";
        if (!groups[provider]) {
          groups[provider] = [];
        }
        groups[provider].push(model);
        return groups;
      }, {});
    }

    // 有搜索文本时，只显示匹配的模型
    const searchLower = searchText.toLowerCase();
    const matchedModels = models.filter((model) => {
      const name = (model.displayName || model.name).toLowerCase();
      return name.includes(searchLower);
    });

    // 将匹配的模型按provider分组
    return matchedModels.reduce(
      (groups: Record<string, ModelType[]>, model) => {
        const provider = model?.provider?.providerName || "OpenAI";
        if (!groups[provider]) {
          groups[provider] = [];
        }
        groups[provider].push(model);
        return groups;
      },
      {},
    );
  }, [models, searchText]);

  const handleModelSelect = (model: ModelType) => {
    onSelection(model);
    onClose();
  };

  // 高亮匹配文本
  const highlightText = (text: string) => {
    if (!searchText) return text;
    const parts = text.split(new RegExp(`(${searchText})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === searchText.toLowerCase() ? (
        <span key={i} className={styles["highlight"]}>
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  // 检查模型是否被选中
  const isModelActive = (model: ModelType) => {
    const modelProvider = model?.provider?.providerName || "OpenAI";
    return model.name === defaultModel && modelProvider === defaultProvider;
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Drawer: {
            colorBgElevated: "var(--white)",
            colorText: "var(--black)",
            colorIcon: "var(--black)",
            colorIconHover: "var(--primary)",
            colorBorder: "var(--border-in-light)",
          },
          Input: {
            colorBgContainer: "var(--white)",
            colorBorder: "var(--border-in-light)",
            colorText: "var(--black)",
            colorTextPlaceholder: "#666",
            activeBorderColor: "var(--primary)",
            hoverBorderColor: "var(--primary)",
            controlOutline: "var(--primary)",
            activeShadow: "0 0 0 1px var(--primary)",
          },
        },
      }}
    >
      <Drawer
        title={title}
        open={visible}
        onClose={onClose}
        width={600}
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <div className={styles["model-selector"]}>
          <div className={styles["search-container"]}>
            <Input
              prefix={<SearchOutlined />}
              placeholder="搜索模型..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </div>
          <div className={styles["model-list-container"]}>
            {Object.entries(groupedModels).map(([provider, providerModels]) => (
              <div key={provider} className={styles["model-group"]}>
                <div className={styles["group-title"]}>{provider}</div>
                <div className={styles["model-list"]}>
                  {providerModels.map((model) => (
                    <div
                      key={getModelKey(model)}
                      className={clsx(styles["model-item"], {
                        [styles["model-item-active"]]: isModelActive(model),
                      })}
                      onClick={() => handleModelSelect(model)}
                    >
                      <div className={styles["model-icon"]}>
                        <ProviderAvatar
                          provider={model.provider?.providerName}
                        />
                      </div>
                      <div className={styles["model-info"]}>
                        <div className={styles["model-name"]}>
                          {highlightText(model.displayName || model.name)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Drawer>
    </ConfigProvider>
  );
};
