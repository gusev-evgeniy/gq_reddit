import { OutputBlockData } from "@editorjs/editorjs";

export type EditorProps = {
  onChange: (arr: OutputBlockData[]) => void;
  placeholder: string;
};