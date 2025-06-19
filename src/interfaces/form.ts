export interface FormProps<T> {
  closeForm: () => void;
  item: T | null;
}