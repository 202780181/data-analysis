import {createContext} from "react";


type defaultValue = {
  count: number
}
export default createContext<defaultValue>(
  {
    count:0
  }
)
