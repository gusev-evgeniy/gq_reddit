import { OutputBlockData } from "@editorjs/editorjs";
import { Data } from "../generated/graphql";

export type EditorProps = {
  onChange: (arr: OutputBlockData[]) => void;
  placeholder: string;
  clear: boolean;
  block: OutputBlockData<string, Data>[]
};