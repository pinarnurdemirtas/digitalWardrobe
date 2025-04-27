import React from 'react';
import { Box, VStack, HStack, Text, Pressable, Icon, Input, Button } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import ClothesGrid from './ClothesGrid';
import CommentList from './CommentList';

// Tek bir post kartı
export default function PostCard({
  post,
  likeCount,
  comments,
  expanded,
  onLike,
  onCommentSend,
  commentText,
  onCommentTextChange,
  onExpandComments,
}) {
  const createdAt = new Date(post.createdAt);
  const date = createdAt.toLocaleDateString('tr-TR');
  const time = createdAt.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

  return (
    <Box bg="white" borderRadius="xl" shadow={2} p={4}>
      {/* Üst: Kullanıcı ve Beğeni */}
      <HStack alignItems="center" justifyContent="space-between" mb={3}>
        <VStack>
          <Text fontSize="md" fontWeight="bold" color="#054f5c">
            {post.userFullName}
          </Text>
          <Text fontSize="sm" color="gray.500">{post.city}</Text>
        </VStack>
        <HStack alignItems="center" space={1}>
          <Pressable onPress={() => onLike(post.id, post.isFavorite)}>
            <Icon
              as={MaterialIcons}
              name={post.isFavorite ? 'favorite' : 'favorite-border'}
              color={post.isFavorite ? 'red.500' : 'gray.400'}
              size="lg"
            />
          </Pressable>
          <Text fontSize="md" fontWeight="bold" color="#054f5c">
            {likeCount?.likeCount || 0}
          </Text>
        </HStack>
      </HStack>

      {/* Orta: Görseller + Tarih-Saat */}
      <HStack space={4} alignItems="center">
        <ClothesGrid clothes={post.clothes} />
        <VStack flex={1} space={1}>
          <Text fontSize="lg" fontWeight="bold" color="#054f5c">{post.name || `Kombin #${post.id}`}</Text>
          <Text fontSize="sm" color="gray.500">Tarih: {date}</Text>
          <Text fontSize="sm" color="gray.500">Saat: {time}</Text>
          <Text fontSize="xs" color="gray.500" mt={1}>Kıyafet sayısı: {post.clothes.length}</Text>
        </VStack>
      </HStack>

      {/* Yorum Alanı */}
      <HStack space={2} alignItems="center" mt={4}>
        <Input
          flex={1}
          value={commentText || ''}
          onChangeText={onCommentTextChange}
          placeholder="Yorum yap..."
          borderRadius="full"
          bg="gray.100"
          _focus={{ bg: "gray.200", borderColor: "#054f5c" }}
        />
        <Button
          onPress={onCommentSend}
          bg="#054f5c"
          borderRadius="full"
          px={4}
          _pressed={{ bg: "#043e49" }}
        >
          Gönder
        </Button>
      </HStack>

      {/* Yorum Listesi */}
      <CommentList
        comments={comments}
        expanded={expanded}
        onExpand={onExpandComments}
      />
    </Box>
  );
}
