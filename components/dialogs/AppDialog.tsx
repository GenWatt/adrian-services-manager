'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useFormik } from 'formik'
import appValidationSchema, { appDefaultValues } from '@/lib/schemas/AppSchema'
import InputControl from '../InputControl'
import useFile from '@/lib/hooks/useFile'
import ImagePreview from '../ImagePreview'
import { useRef, useState } from 'react'
import { useToast } from '../ui/use-toast'
import { objectToFormData } from '@/lib/utils'
import useError from '@/lib/hooks/useError.'
import { createApp } from '@/app/api/(apps)'
import { useAppsContext } from '@/lib/context/AppContext'
import { PlusSquare } from 'lucide-react'
import CustomTooltip from '../tooltips/CustomToolltip'

export default function AppDialog() {
  const { handleImageChange, imagePreview, resetImagePreview, isFileImage } =
    useFile()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const { showError } = useError()
  const appContext = useAppsContext()

  const image = useRef<HTMLInputElement>(null)
  const formik = useFormik({
    initialValues: appDefaultValues,
    validate: (values) => {
      try {
        appValidationSchema.parse(values)
      } catch (error: any) {
        return error.formErrors.fieldErrors
      }
    },
    onSubmit,
  })

  function resetForm() {
    formik.resetForm()
    resetImagePreview()
    image.current && (image.current.value = '')
  }

  async function onSubmit(values: typeof appDefaultValues) {
    const formData = objectToFormData(values)

    if (
      image.current &&
      image.current.files &&
      isFileImage(image.current?.files[0])
    ) {
      formData.append('file', image.current.files[0])
    }
    try {
      setIsLoading(true)
      const response = await createApp(formData)

      resetForm()
      toast({
        title: 'Success',
        description: response.message,
      })
      appContext.addApp(response.data)
    } catch (error) {
      showError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog>
      <CustomTooltip content="Add new application">
        <DialogTrigger asChild>
          <Button variant={'secondary'}>
            <PlusSquare />
          </Button>
        </DialogTrigger>
      </CustomTooltip>
      <DialogContent className="w-[310px]">
        <DialogHeader>
          <DialogTitle>Add new application</DialogTitle>
          <DialogDescription>
            Fill the form to add your new application
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit}>
          <InputControl
            name="name"
            label="App name"
            placeholder="App name..."
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.errors.name}
          />
          <InputControl
            name="description"
            label="Description"
            placeholder="Describe your app..."
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.errors.description}
          />
          <InputControl
            name="version"
            label="Version"
            placeholder="App version..."
            value={formik.values.version}
            onChange={formik.handleChange}
            error={formik.errors.version}
          />
          <InputControl
            type="url"
            name="url"
            label="App URL"
            placeholder="App URL..."
            value={formik.values.url}
            onChange={formik.handleChange}
            error={formik.errors.url}
          />
          <InputControl
            name="category"
            label="Category"
            placeholder="App category..."
            value={formik.values.category}
            onChange={formik.handleChange}
            error={formik.errors.category}
          />
          <ImagePreview src={imagePreview} alt={formik.values.name} />
          <InputControl
            ref={image}
            type="file"
            name="iamge"
            label="Image"
            onChange={handleImageChange}
            error={formik.errors.image}
            accept="image/.jpg, image/.jpeg, image/.png"
          />
          <Button isLoading={isLoading} type="submit">
            Add Aplication
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
