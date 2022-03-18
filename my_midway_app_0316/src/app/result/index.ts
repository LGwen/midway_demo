interface ResultProps {
  code: number;
  success: boolean;
  [propsName: string]: any;
}
export const Result = (props: ResultProps): ResultProps => {
  return { ...props };
};
