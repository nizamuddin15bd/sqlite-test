import { Stack } from "expo-router";
import React, { memo } from "react";

const DetailsLayout = () => {
  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "ios_from_right" }}
    />
  );
};

export default memo(DetailsLayout);
