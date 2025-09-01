// PostContext.tsx

import React, { createContext, useState, useContext, ReactNode } from "react";
import { useCreatePost } from "../components/hooks/usePostMutation";
import { NewPostPayload } from "../api/type/apiType";
import { Alert } from "react-native";
export interface Attachment {
  uri: string;
  type: "image" | "video" | "audio";
}

interface PostFormState {
  problem: string | null;
  situation: string | null;
  mind: string | null;
  religion: string | null;
  mainSelection: string | null;
  subSelection: string | null;
  content: string;
  selectedPosts: number[];
  helpOptions: string[];
  isAnonymous: boolean;
  attachments: Attachment[];
}

interface PostContextType {
  form: PostFormState;
  handleFilterChange: (key: keyof PostFormState, value: string | null) => void;
  handleSubmit: () => void;
  resetForm: () => void;
  handleSelectPost: (postId: number) => void;
  handleToggleHelpOption: (option: string) => void;
  setAnonymous: (isAnon: boolean) => void;
  addAttachment: (attachment: Attachment) => void;
  removeAttachment: (uri: string) => void;
  isPending: boolean;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

const problemMap: { [key: string]: string } = {
  daily_talk: "LIGHT_STORY",
  bullying: "BULLYING",
  academic: "ACADEMIC",
  relationship: "FRIENDS",
  parents: "PARENTS",
  teacher: "TEACHERS",
  economic: "ECONOMY",
  appearance: "APPEARANCE",
  overcome: "OVERCOME",
  catseye: "CATSEYE",
};

const severityMap: { [key: string]: string } = {
  level_1: "OK",
  level_2: "LITTLE_SERIOUS",
  level_3: "SERIOUS",
  level_4: "VERY_SERIOUS",
  level_5: "EXTREMELY_SERIOUS",
};

const stateMap: { [key: string]: string } = {
  any: "OK",
  anxious_1: "LITTLE_ANXIOUS",
  anxious_2: "ANXIOUS",
  anxious_3: "VERY_ANXIOUS",
  anxious_4: "EXTREMELY_ANXIOUS",
};

const religionMap: { [key: string]: string } = {
  christianity: "CHRISTIAN",
  catholicism: "CATHOLIC",
  buddhism: "BUDDHIST",
  none: "NONE",
};

type PostProviderProps = {
  children: ReactNode;
};

const initialState: PostFormState = {
  problem: null,
  situation: null,
  mind: null,
  religion: null,
  mainSelection: null,
  subSelection: null,
  content: "",
  selectedPosts: [],
  helpOptions: [],
  isAnonymous: false,
  attachments: [],
};

export const PostProvider = ({ children }: PostProviderProps) => {
  const [form, setForm] = useState<PostFormState>(initialState);
  const { mutate: createPostMutation, isPending } = useCreatePost();

  const setAnonymous = (isAnon: boolean) => {
    setForm((prevForm) => ({ ...prevForm, isAnonymous: isAnon }));
  };

  const handleFilterChange = (
    key: keyof PostFormState,
    value: string | null
  ) => {
    setForm((prevForm) => ({ ...prevForm, [key]: value }));
  };

  const handleSubmit = () => {
    if (
      !form.problem ||
      !form.content ||
      !form.situation ||
      !form.mind ||
      !form.religion
    ) {
      Alert.alert("알림", "문제 유형과 내용은 필수 입력 항목입니다.");
      return;
    }

    const payload: NewPostPayload = {
      userId: 1,
      category: problemMap[form.problem],
      anonymity: form.isAnonymous,
      content: form.content,
      // mediaUrls: form.attachments.map((file) => file.uri),
      mediaUrls:
        form.attachments.length > 0 ? form.attachments.map((a) => a.uri) : null,
      severity: severityMap[form.situation],
      state: stateMap[form.mind],
      religion: religionMap[form.religion],
      fromHolding: form.mainSelection === "holdingFive" ? true : false,
      tags: form.helpOptions,
      hasBeforeStory: form.selectedPosts.length > 0 ? true : false,
      beforeStoryPostId: form.selectedPosts[0],
    };

    createPostMutation(payload);
  };

  const handleToggleHelpOption = (option: string) => {
    setForm((prevForm) => {
      const currentOptions = prevForm.helpOptions;

      const newOptions = currentOptions.includes(option)
        ? currentOptions.filter((key) => key !== option)
        : [...currentOptions, option];

      return { ...prevForm, helpOptions: newOptions };
    });
  };

  const handleSelectPost = (postId: number) => {
    setForm((prevForm) => {
      const currentSelected = prevForm.selectedPosts;
      const newSelected = currentSelected.includes(postId)
        ? currentSelected.filter((id) => id !== postId)
        : [...currentSelected, postId];

      return { ...prevForm, selectedPosts: newSelected };
    });
  };

  const addAttachment = (attachment: Attachment) => {
    setForm((prevForm) => ({
      ...prevForm,
      attachments: [...prevForm.attachments, attachment],
    }));
  };

  const removeAttachment = (uri: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      attachments: prevForm.attachments.filter((file) => file.uri !== uri),
    }));
  };

  const resetForm = () => {
    setForm(initialState);
  };

  const value = {
    form,
    handleFilterChange,
    handleSubmit,
    resetForm,
    handleSelectPost,
    handleToggleHelpOption,
    setAnonymous,
    addAttachment,
    removeAttachment,
    isPending,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePost = () => {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error("usePost must be used within a PostProvider");
  }
  return context;
};
