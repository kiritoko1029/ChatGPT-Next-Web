import ChatglmIcon from "@/app/icons/models/chatglm-color.svg";
import ClaudeIcon from "@/app/icons/models/claude-color.svg";
import DoubaoIcon from "@/app/icons/models/doubao-color.svg";
import GeminiIcon from "@/app/icons/models/gemini-color.svg";
import GrokIcon from "@/app/icons/models/grok.svg";
import OpenaiIcon from "@/app/icons/models/openai.svg";
import QwenIcon from "@/app/icons/models/qwen-color.svg";
import StabilityIcon from "@/app/icons/models/stability-color.svg";
import HunyuanIcon from "@/app/icons/models/hunyuan-color.svg";
import MoonshotIcon from "@/app/icons/models/moonshot.svg";
import SparkIcon from "@/app/icons/models/spark-color.svg";
import WenxinIcon from "@/app/icons/models/wenxin-color.svg";

import { ServiceProvider } from "@/app/constant";

interface ProviderAvatarProps {
  provider?: string;
}

export const ProviderAvatar = (props: ProviderAvatarProps) => {
  const { provider } = props;

  const renderIcon = (provider: ServiceProvider) => {
    switch (provider) {
      case ServiceProvider.OpenAI:
        return <OpenaiIcon className="user-avatar" />;
      case ServiceProvider.Azure:
        return <OpenaiIcon className="user-avatar" />;
      case ServiceProvider.Google:
        return <GeminiIcon className="user-avatar" />;
      case ServiceProvider.Anthropic:
        return <ClaudeIcon className="user-avatar" />;
      case ServiceProvider.Baidu:
        return <WenxinIcon className="user-avatar" />;
      case ServiceProvider.ByteDance:
        return <DoubaoIcon className="user-avatar" />;
      case ServiceProvider.Alibaba:
        return <QwenIcon className="user-avatar" />;
      case ServiceProvider.Tencent:
        return <HunyuanIcon className="user-avatar" />;
      case ServiceProvider.Moonshot:
        return <MoonshotIcon className="user-avatar" />;
      case ServiceProvider.Stability:
        return <StabilityIcon className="user-avatar" />;
      case ServiceProvider.Iflytek:
        return <SparkIcon className="user-avatar" />;
      case ServiceProvider.XAI:
        return <GrokIcon className="user-avatar" />;
      case ServiceProvider.ChatGLM:
        return <ChatglmIcon className="user-avatar" />;
      default:
        return <OpenaiIcon className="user-avatar" />;
    }
  };

  return (
    <div className="no-dark">{renderIcon(provider as ServiceProvider)}</div>
  );
};
