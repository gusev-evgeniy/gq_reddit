import React, { createContext, Dispatch, FC, SetStateAction, useState } from 'react';
import { DialogType } from '../types/dialog';
import { ProviderProps } from './type';

type Dialog = DialogType|undefined;
type Value =[ Dialog, Dispatch<SetStateAction<Dialog>>|undefined];

export const DialogContext = createContext<Value>([undefined, undefined]);

export const DialogProvider: FC<ProviderProps> = ({ children }) => {
  const [dialog, setDialog] = useState<DialogType|undefined>();
  
  return <DialogContext.Provider value={[dialog, setDialog]}>{children}</DialogContext.Provider>;
};
