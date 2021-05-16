import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const verticleScale = (size = 1) => {
  return (height / 568) * size
}

const scale = (size = 1) => {
  return (width / 320) * size
}

export { verticleScale, scale }
