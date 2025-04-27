import React, { useEffect, useState } from 'react';
import { ScrollView, VStack, Center, Spinner } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostCard from '../../components/Interaction/PostCard';

export default function InteractionScreen() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likeCounts, setLikeCounts] = useState({});
  const [commentTexts, setCommentTexts] = useState({});
  const [comments, setComments] = useState({});
  const [userId, setUserId] = useState(null);
  const [expandedComments, setExpandedComments] = useState({});
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userStr = await AsyncStorage.getItem('user');
      const user = JSON.parse(userStr);
      setUserId(user.id);

      const response = await fetch('http://wardrobe.pinarnur.com/api/Interaction/explore');
      const data = await response.json();
      setPosts(data);

      const likeData = {};
      const commentData = {};

      for (const post of data) {
        const likeRes = await fetch(`http://wardrobe.pinarnur.com/api/Interaction/like-count/${post.id}`);
        likeData[post.id] = await likeRes.json();

        const commentRes = await fetch(`http://wardrobe.pinarnur.com/api/Interaction/comments/${post.id}`);
        commentData[post.id] = await commentRes.json();
      }

      setLikeCounts(likeData);
      setComments(commentData);
    } catch (err) {
      console.error('Veri alınamadı:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId, isLiked) => {
    if (!userId) return;

    try {
      if (isLiked) {
        await fetch(`http://wardrobe.pinarnur.com/api/Interaction/toggle-visibility/${postId}`, { method: 'PUT' });
      } else {
        await fetch(`http://wardrobe.pinarnur.com/api/Interaction/like/${postId}/${userId}`, { method: 'POST' });
      }

      const res = await fetch(`http://wardrobe.pinarnur.com/api/Interaction/like-count/${postId}`);
      const data = await res.json();
      setLikeCounts((prev) => ({ ...prev, [postId]: data }));
    } catch (err) {
      console.error('Beğeni işlemi başarısız:', err);
    }
  };

  const handleComment = async (postId) => {
    if (!userId || !commentTexts[postId]) return;

    try {
      await fetch(`http://wardrobe.pinarnur.com/api/Interaction/comment/${postId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          text: commentTexts[postId],
        }),
      });

      const commentRes = await fetch(`http://wardrobe.pinarnur.com/api/Interaction/comments/${postId}`);
      const newComments = await commentRes.json();
      setComments((prev) => ({ ...prev, [postId]: newComments }));
      setCommentTexts((prev) => ({ ...prev, [postId]: '' }));
    } catch (err) {
      console.error('Yorum gönderilemedi:', err);
    }
  };

  const handleScroll = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    setScrollPosition(contentOffsetY);

    if (contentOffsetY > 300) {
      setExpandedComments({});
    }
  };

  if (loading) {
    return (
      <Center flex={1}>
        <Spinner color="#054f5c" size="lg" />
      </Center>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ padding: 16, backgroundColor: '#f0f4f8' }}
      onScroll={handleScroll}
    >
      <VStack space={4}>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            likeCount={likeCounts[post.id]}
            comments={comments[post.id] || []}
            expanded={expandedComments[post.id]}
            onLike={handleLike}
            onCommentSend={() => handleComment(post.id)}
            commentText={commentTexts[post.id]}
            onCommentTextChange={(text) =>
              setCommentTexts((prev) => ({ ...prev, [post.id]: text }))
            }
            onExpandComments={() =>
              setExpandedComments((prev) => ({ ...prev, [post.id]: true }))
            }
          />
        ))}
      </VStack>
    </ScrollView>
  );
}
