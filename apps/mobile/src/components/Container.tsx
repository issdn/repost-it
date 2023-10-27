import { Slot } from "expo-router";
import { styled } from "nativewind";
import { View } from "react-native";

const StyledView = styled(View);

const alignments = {
  row: "flex flex-row",
  col: "flex flex-col",
  vcenter: "flex flex-col justify-center",
  hcenter: "flex flex-row justify-center",
  center: "flex flex-col items-center justify-center",
} as const;

export default function Container({
  children,
  alignment,
  style = "",
}: {
  children: JSX.Element | JSX.Element[];
  alignment?: keyof typeof alignments;
  style?: string;
}) {
  const _alignment = alignments
    ? alignments[alignment as keyof typeof alignments]
    : "";
  return (
    <StyledView tw={`h-full px-2 py-4 ${_alignment} ${style}`}>
      {children}
    </StyledView>
  );
}
