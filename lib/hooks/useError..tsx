import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'

export default function useError() {
  const { toast } = useToast()

  function showError(error: any) {
    if (axios.isAxiosError(error) && error.response?.data.length < 100) {
      console.log(error.response)
      toast({
        title: error.message,
        description: error.response?.data,
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  return {
    showError,
  }
}
