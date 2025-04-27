import React from "react";
import { VStack, Input, Select, Button } from "native-base";

export default function ProfileForm({ formData, setFormData, editing, onSave, onEdit, onDelete }) {
  return (
    <VStack space={4} mt="6">
      <Input
        placeholder="Ad Soyad"
        value={formData.fullname}
        onChangeText={(val) => setFormData({ ...formData, fullname: val })}
        isDisabled={!editing}
      />
      <Input
        placeholder="Kullanıcı Adı"
        value={formData.username}
        onChangeText={(val) => setFormData({ ...formData, username: val })}
        isDisabled={!editing}
      />
      <Input
        placeholder="Email"
        value={formData.email}
        onChangeText={(val) => setFormData({ ...formData, email: val })}
        isDisabled={!editing}
      />
      <Input
        placeholder="Şehir"
        value={formData.city}
        onChangeText={(val) => setFormData({ ...formData, city: val })}
        isDisabled={!editing}
      />
      <Select
        selectedValue={formData.gender}
        onValueChange={(val) => setFormData({ ...formData, gender: val })}
        isDisabled={!editing}
      >
        <Select.Item label="Kadın" value="Female" />
        <Select.Item label="Erkek" value="Male" />
        <Select.Item label="Belirtilmedi" value="Other" />
      </Select>

      <VStack space={3} mt="6">
        {editing ? (
          <Button bg="#054f5c" _pressed={{ bg: "#043c41" }} onPress={onSave}>
            Kaydet
          </Button>
        ) : (
          <Button variant="outline" borderColor="#054f5c" _text={{ color: "#054f5c", fontWeight: "bold" }} onPress={onEdit}>
            Profili Düzenle
          </Button>
        )}
        <Button bg="red.500" _pressed={{ bg: "red.700" }} onPress={onDelete}>
          Hesabı Sil
        </Button>
      </VStack>
    </VStack>
  );
}
