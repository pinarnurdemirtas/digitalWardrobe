import React from 'react';
import { VStack, Box, Text, Button } from 'native-base';

// Yorumları ve daha fazla yorum gösterimini yöneten component
export default function CommentList({ comments, expanded, onExpand }) {
  const visibleComments = expanded ? comments : comments.slice(0, 2);

  return (
    <VStack space={2} mt={4}>
      {visibleComments.length > 0 ? (
        <>
          {visibleComments.map((comment) => (
            <Box key={comment.id} bg="gray.100" p={2} borderRadius="md">
              <Text fontSize="sm" color="black">{comment.text}</Text>
              <Text fontSize="xs" color="gray.500">
                {new Date(comment.createdAt).toLocaleString('tr-TR')}
              </Text>
            </Box>
          ))}
          {comments.length > 2 && !expanded && (
            <Button
              variant="ghost"
              _text={{ color: "#054f5c", fontSize: "sm" }}
              onPress={onExpand}
            >
              Daha fazla...
            </Button>
          )}
        </>
      ) : (
        <Text fontSize="sm" color="gray.400" textAlign="center" mt={2}>
          Henüz yorum yok
        </Text>
      )}
    </VStack>
  );
}
