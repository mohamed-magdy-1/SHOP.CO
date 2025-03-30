"use client";

import { useEffect } from "react";
import TagManager from "react-gtm-module";

const GTMProvider = () => {
  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-WSSWWHK3" }); 
  }, []);


  return null; 
};

export default GTMProvider;
