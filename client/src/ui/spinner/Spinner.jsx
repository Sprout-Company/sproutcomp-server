
import { cx } from 'classix'
import {
  FaDiceOne, 
  FaDiceTwo, 
  FaDiceThree, 
  FaDiceFour, 
  FaDiceFive, 
  FaDiceSix
} from 'react-icons/fa'
import { randomItem } from '@/utils'
import module from './Spinner.module.css'

const dices = [ 
  FaDiceOne,
  FaDiceTwo, 
  FaDiceThree, 
  FaDiceFour, 
  FaDiceFive, 
  FaDiceSix
]

export const Spinner = ({className}) => {
  let [Dice1, Dice2] = [randomItem(dices), randomItem(dices)];
 
  return (
    <div className={cx(module.spinner, className)}>
      <div 
        className={module['spinner-0']}
        children={<Dice1/>}
      />
      <div 
        className={module['spinner-1']}
        children={<Dice2/>}
      /> 
    </div>
  );
};
