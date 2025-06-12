import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

type ListFooterProps = {
  loadingMore: boolean;
  dataLength: number;
  totalResult: number;
  hasMore?: boolean;
};

const ListFooter: React.FC<ListFooterProps> = ({
  loadingMore,
  dataLength,
  totalResult,
  hasMore,
}) => {
  if (loadingMore && dataLength < totalResult) {
    return <ActivityIndicator size="large" style={{ paddingBottom: 50 }} />;
  }

  //   if (dataLength >= totalResult) {
  //     return (
  //       <View style={{ padding: 10, alignItems: "center" }}>
  //         <Text>No more data</Text>
  //       </View>
  //     );
  //   }
  if (!hasMore && !loadingMore) {
    return (
      <View
        style={{
          padding: 10,
          alignItems: "center",
          paddingBottom: 50,
        }}
      >
        <Text className="text-black italic px-5 py-2 rounded-lg10 font-bold opacity-[60%]">
          No more data
        </Text>
      </View>
    );
  }

  return null;
};

export default ListFooter;
