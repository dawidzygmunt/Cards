import { Card, CardContent } from '@/components/ui/card'
import ContainerApp from '@/components/ui/containerApp'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"


const Messages = () => {
  return (
    <ContainerApp title='Poczta'>
      <Card>
        <CardContent>
          <ResizablePanelGroup direction='vertical'>
            <ResizablePanel>
              <ResizableHandle />
            </ResizablePanel>
            <ResizablePanel>
              <ResizableHandle />
            </ResizablePanel>
          </ResizablePanelGroup>
        </CardContent>
      </Card>
    </ContainerApp>
  )
}

export default Messages