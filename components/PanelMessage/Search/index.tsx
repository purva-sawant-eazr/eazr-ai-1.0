"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FadeLoader } from "react-spinners";
import { useClickAway } from "react-use";
import Icon from "@/components/Icon";
import { items } from "./items";

const Search = () => {
  const [itemStates, setItemStates] = useState<
    Array<"pending" | "loading" | "active">
  >(new Array(items.length).fill("pending"));

  const [visible, setVisible] = useState(false);

  const ref = useRef(null);
  useClickAway(ref, () => setVisible(false));

  useEffect(() => {
    if (!visible) {
      setItemStates(new Array(items.length).fill("pending"));
      return;
    }

    const timeouts: NodeJS.Timeout[] = [];

    const animateItems = () => {
      items.forEach((_, index) => {
        const loadingTimeout = setTimeout(() => {
          setItemStates((prev) => {
            const newStates = [...prev];
            newStates[index] = "loading";
            return newStates;
          });
        }, 3000 * index);

        const activeTimeout = setTimeout(() => {
          setItemStates((prev) => {
            const newStates = [...prev];
            newStates[index] = "active";
            return newStates;
          });
        }, 3000 * index + 3000);

        timeouts.push(loadingTimeout, activeTimeout);
      });
    };

    animateItems();

    return () => timeouts.forEach((timeout) => clearTimeout(timeout));
  }, [visible]);

  return (
    <div className="flex mr-auto relative" ref={ref}>
      <button className="group" onClick={() => setVisible(!visible)}>
        <Icon
          className={`transition-colors group-hover:fill-brand-secondary ${
            visible ? "fill-brand-secondary" : "fill-[#9CA3AF]"
          }`}
          name="ai-search"
        />
      </button>

      {visible && (
        <motion.div
          className="absolute -left-0.5 bottom-[calc(100%+0.75rem)] -right-0.5 p-3.5 rounded-xl border border-brand-secondary/30 bg-white shadow-[0_0_2.5rem_rgba(0,0,0,0.1)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="flex items-center p-1.5 pr-3 rounded-xl bg-gradient-to-r from-[#E7FBF4] to-[#F9FAF9] shadow-sm border border-brand-secondary/10">
            <div className="flex items-center gap-3 mr-auto text-brand-primary text-sm font-semibold">
              <div className="flex justify-center items-center size-9 rounded-lg bg-brand-secondary/10">
                <Icon className="fill-brand-primary" name="chat" />
              </div>
              <span>Results</span>
            </div>

            <button className="group flex items-center gap-1.5 text-text-tertiary hover:text-brand-primary transition-colors">
              <Icon
                className="fill-[#9CA3AF] group-hover:fill-brand-primary transition-colors"
                name="eye-hide"
              />
              <span className="text-sm font-medium">Hide Steps</span>
            </button>
          </div>

          {/* Animated Steps */}
          <div className="mt-3.5 p-3 bg-[#E7FBF4]/70 rounded-xl border border-brand-secondary/10">
            {items.map((item, index) => {
              const state = itemStates[index];
              const isPending = state === "pending";
              const isLoading = state === "loading";
              const isActive = state === "active";

              return (
                <div
                  key={index}
                  className={`flex items-center gap-2 not-last:mb-3 transition-opacity ${
                    isPending
                      ? "opacity-30"
                      : isLoading
                      ? "opacity-100 text-brand-secondary"
                      : "opacity-100"
                  }`}
                >
                  <div className="relative shrink-0 size-[20px]">
                    {isLoading ? (
                      <div className="absolute -top-[20px] -left-[18px] scale-40">
                        <FadeLoader color="#00A896" />
                      </div>
                    ) : (
                      <Icon
                        className="!size-[20px] fill-brand-primary"
                        name={item.icon}
                      />
                    )}
                  </div>
                  <div className="text-sm text-text-primary">
                    {item.title}
                    {isActive && (
                      <Icon
                        className="-my-0.5 ml-2 fill-[#1DAF61]"
                        name="check"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Search;
