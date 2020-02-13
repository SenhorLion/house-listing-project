import React, { FunctionComponent } from "react";

interface IProps {
  title: string;
}

export const Listings: FunctionComponent<IProps> = ({ title }: IProps) => {
  return <h2>{title}</h2>;
};
