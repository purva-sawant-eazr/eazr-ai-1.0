"use client";

import Layout from "@/components/Layout";
import Image from "@/components/Image";
import PanelMessage from "@/components/PanelMessage";
import Item from "./Item";

import { items } from "./items";

const HomePage = () => {
    return (
        <Layout>
            <div className="chat-wrapper">
                <div className="-mb-3 pt-18 px-7.5 pb-12 grow overflow-auto scrollbar-none max-md:pt-4 max-md:px-4 max-md:pb-8">
                    <div className="mb-12 text-center max-md:mb-6">
                        <Image
                            className="w-21 mb-3 opacity-100"
                            src="/images/ai-voice.png"
                            width={84}
                            height={85}
                            alt="AI Voice"
                        />
                        <div className="mb-3 text-h3 max-md:mb-1.5 max-md:text-[1.6rem]">
                            Welcome Odyssey AI
                        </div>
                        <div className="max-w-120 mx-auto text-p-xl text-sub-600 max-md:text-p-sm">
                            Get Started by Script a task and chat can do the
                            rest. Not sure where to start?
                        </div>
                    </div>
                    <div className="flex flex-wrap -mt-3 -mx-1.5">
                        {items.map((item) => (
                            <Item item={item} key={item.id} />
                        ))}
                    </div>
                </div>
                <PanelMessage />
            </div>
        </Layout>
    );
};

export default HomePage;
