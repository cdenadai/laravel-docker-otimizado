import { useState } from "react";

export default function useVisible() {
    const [visible, setVisible] = useState(true);
  
    const handleClose = () => {
      setVisible(false);
    };
    
    return { visible, handleClose };
    
}