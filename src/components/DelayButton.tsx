import React from 'react'
import { View, Text, TouchableOpacityProps } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

type DelayButtonProps = {
  enableAfter: number;
}

const DelayButton: React.FC<TouchableOpacityProps & DelayButtonProps> = (props) => {
  const [enabled, setEnabled] = React.useState(false);

  let enableTimeout: NodeJS.Timeout;
  if (!enabled) {
    enableTimeout = setTimeout(() => {
      setEnabled(true);
    }, props.enableAfter)
  }

  React.useEffect(() => {
    return () => {
      if (enableTimeout) {
        clearTimeout(enableTimeout);
      }
    }
  })

  return (
    <TouchableOpacity disabled={!enabled} {...props}>
      {props.children}
    </TouchableOpacity>
  )
}

export default DelayButton
