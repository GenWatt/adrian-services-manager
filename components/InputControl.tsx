import React, { forwardRef, useId } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'

export interface IInputControlProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const InputControl = forwardRef<HTMLInputElement, IInputControlProps>(
  ({ label, error, ...props }, ref) => {
    const id = useId()

    return (
      <div className="my-2">
        {label && (
          <Label className="mb-1" htmlFor={id}>
            {label}
          </Label>
        )}
        <Input ref={ref} id={id} {...props} />
        {error && <span className="text-destructive text-sm">{error}</span>}
      </div>
    )
  }
)

InputControl.displayName = 'InputControl'

export default InputControl
