import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"

interface Props {
  setQuery: (value: string) => void
  disabled?: boolean
}

export function SearchInput(props: Props) {
  const { setQuery, disabled } = props;

  const [inputVal, setInputVal] = useState("");           // immediate input

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery(inputVal);
    }, 500) // wait 500ms after typing stops

    return () => clearTimeout(timeout)
  }, [inputVal]);

  return (
    <Input
      placeholder="Search"
      value={inputVal}
      onChange={(e) => setInputVal(e.target.value)}
      disabled={disabled}
    />
  )
}
