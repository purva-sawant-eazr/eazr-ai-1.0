// components/Chat/index.tsx
import PanelMessage from "@/components/PanelMessage";
import Head from "./Head";

type Props = {
  titleHead?: React.ReactNode;
  hidePanelMessage?: boolean;
  children: React.ReactNode;
  onSendMessage?: (message: string) => void;
  isLoading?: boolean;
};

const Chat = ({ titleHead, hidePanelMessage, children, onSendMessage, isLoading }: Props) => {
  return (
    <div className="chat-wrapper">
      <Head title={titleHead} />
      <div
        className={`flex flex-col gap-4.5 grow px-7.5 pb-7.5 overflow-auto scrollbar-none max-md:gap-3 max-md:px-4 max-md:pb-8 ${
          hidePanelMessage ? "" : "-mb-3 pb-10"
        }`}
      >
        {children}
      </div>
      {!hidePanelMessage && <PanelMessage onSend={onSendMessage} isLoading={isLoading} />}
    </div>
  );
};

export default Chat;