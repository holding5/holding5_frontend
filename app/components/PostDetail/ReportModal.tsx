// src/components/ReportModal.tsx

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
} from "react-native";

// 신고 사유 목록 (나중에 다른 곳에서도 쓸 수 있도록 분리)
const REPORT_REASONS = [
  { type: "INSULT", text: "언어폭력" },
  { type: "SPAM", text: "도배" },
  { type: "PORN", text: "음담패설성적희롱" },
  { type: "ETC", text: "부적절한언어사용" },
];

interface ReportModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectReason: (reason: { type: string; text: string }) => void;
}

export const ReportModal = ({
  visible,
  onClose,
  onSelectReason,
}: ReportModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose} />

      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>신고 사유 선택</Text>
          {REPORT_REASONS.map((reason) => (
            <TouchableOpacity
              key={reason.type}
              style={styles.optionButton}
              onPress={() => onSelectReason(reason)}
            >
              <Text style={styles.optionText}>{reason.text}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// 스타일시트 (NativeWind className 대신 사용)
const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  optionButton: {
    width: "100%",
    paddingVertical: 12,
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
  },
  cancelButton: {
    width: "100%",
    paddingVertical: 12,
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: "#e5e5e5",
    alignItems: "center",
  },
  cancelText: {
    fontSize: 16,
    color: "red",
  },
});
