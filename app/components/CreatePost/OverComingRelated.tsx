import { View, Text, FlatList } from "react-native";
import OverComingAppbar2 from "./OverComingAppbar2";
import { data } from "../Tab/Wall/utils/data";
import { usePost } from "../../context/PostContext";
import { SelectedPost } from "./SelectedPost";
export default function OverComingRelated() {
  // 1. 전체 게시물 목록을 가져옵니다.
  const allPosts = data;

  // 2. Context에서 form 데이터를 가져옵니다.
  const { form } = usePost();

  // 3. Context에 저장된 선택된 ID 배열 (예: [1, 5, 6])을 가져옵니다.
  const selectedPostIds = form.selectedPosts;

  // 4. 전체 게시물 목록에서, 선택된 ID와 일치하는 게시물만 필터링합니다.
  const selectedPostDetails = allPosts.filter((post) =>
    selectedPostIds.includes(post.id)
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F4F6" }}>
      <OverComingAppbar2 text={"관련 사연"} />

      <FlatList
        data={selectedPostDetails}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
            <SelectedPost post={item} />
          </View>
        )}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <Text style={{ fontSize: 16, color: "gray" }}>
              관련 사연이 없습니다.
            </Text>
          </View>
        }
      />
    </View>
  );
}
