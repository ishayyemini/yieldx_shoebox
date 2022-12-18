import { FC } from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'

const TextFieldWrapper = styled(Box)`
  position: relative;
  background-color: inherit;

  fieldset {
    position: absolute;
    padding: 0 9px;
    margin: 0;
    border: 1px solid var(--outline);
    border-radius: 4px;
    bottom: 0;
    right: 0;
    top: -5px;
    left: 0;
  }

  legend {
    visibility: hidden;
    font-size: 0.65em;
    line-height: 1em;
    transition: max-width 50ms cubic-bezier(0, 0, 0.2, 1) 0ms;

    padding: 0;
    max-width: 0.001px;
  }

  input {
    //font-family: inherit;
    //font-size: 1em;
    //font-weight: 600;
    //height: 1.5em;
    z-index: 1;
    padding: 13px;
    border: none;
    background-color: inherit;
    color: var(--on-surface);
  }

  label {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    pointer-events: none;
    display: flex;
    align-items: center;
  }

  span {
    font-size: 0.9em;
    padding: 0 13px;
    color: var(--on-surface-variant);
    transition: transform 0.15s ease-out, font-size 0.15s ease-out,
      background-color 0.2s ease-out, color 0.15s ease-out;
  }

  input:-webkit-autofill {
    transition: background-color 5000s ease-in-out 0s;
  }

  input:focus {
    outline: none;
  }

  input:focus + label span,
  input:-webkit-autofill + label span,
  input:not(:placeholder-shown) + label span {
    background-color: inherit;
    font-size: 0.65em;
    padding: 0 13px;
    color: var(--outline);
    transform: translate(0, -21px);
  }

  input:focus ~ fieldset legend,
  input:-webkit-autofill ~ fieldset legend,
  input:not(:placeholder-shown) ~ fieldset legend {
    padding: 0 3px;
    max-width: 100%;
  }

  input:hover {
    color: var(--on-surface);
  }

  input:hover + label span {
    color: var(--on-surface);
  }

  input:hover ~ fieldset {
    border-color: var(--on-surface);
  }

  input:focus + label span,
  input:focus ~ fieldset {
    border-color: var(--primary);
    color: var(--primary);
    border-width: 2px;
  }
`

interface TextFieldProps extends Partial<JSX.IntrinsicElements['input']> {
  label: string
}

const TextField: FC<TextFieldProps> = ({ label, name, ...args }) => {
  return (
    <TextFieldWrapper>
      <input name={name} id={name} {...args} placeholder={' '} />
      <label htmlFor={name}>
        <span>{label}</span>
      </label>
      <fieldset>
        <legend>{label}</legend>
      </fieldset>
    </TextFieldWrapper>
  )
}

export { TextField }
