import {
  Grid,
  Card,
  CardBody,
  Heading,
  Box,
  Stack,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
} from '@chakra-ui/react'
import { SlackLoginButton } from '~/features/oauth2-login/components/SlackLoginButton'
import { GithubLoginButton } from '~/features/oauth2-login/components/GithubLoginButton'
import { GoogleLoginButton } from '~/features/oauth2-login/components/GoogleLoginButton'
import { PasswordInput } from '~/components/PasswordInput'
import { useTransition } from '@remix-run/react'
import { ContinueWithLabelBar } from '~/components/ContinueWithLabelBar'
import { json, type LoaderArgs } from '@remix-run/node'
import { auth } from '~/services/auth.server'

export const loader = async ({ request }: LoaderArgs) => {
  await auth.isAuthenticated(request, {
    successRedirect: '/private',
  })
  return json({})
}

export default function Index() {
  const { state } = useTransition()
  const isLoading = state !== 'idle'

  return (
    <Grid templateRows="1fr auto" h="100dvh" bgColor="gray.100">
      <VStack alignSelf="center" w="full">
        <Heading p="4" size="md">
          coji&rsquo;s Remix OAuth Example
        </Heading>

        <Card p="4" borderRadius="xl" shadow="md" bgColor="white">
          <CardBody>
            <Stack gap="4">
              <Stack gap="4">
                <FormControl isDisabled={isLoading}>
                  <FormLabel htmlFor="email">Eメール</FormLabel>
                  <Input
                    bgColor="white"
                    id="email"
                    name="email"
                    type="email"
                  ></Input>
                </FormControl>

                <FormControl isDisabled={isLoading}>
                  <FormLabel htmlFor="password">パスワード</FormLabel>
                  <PasswordInput />
                </FormControl>

                <HStack justify="space-between">
                  <Checkbox defaultChecked isDisabled={isLoading}>
                    ログインを記憶
                  </Checkbox>
                  <Button
                    colorScheme="blue"
                    isDisabled={isLoading}
                    size="sm"
                    variant="link"
                  >
                    パスワードを忘れた?
                  </Button>
                </HStack>

                <Button colorScheme="blue" isDisabled={isLoading}>
                  サインイン
                </Button>
              </Stack>

              <ContinueWithLabelBar color={isLoading ? 'gray.200' : undefined}>
                または
              </ContinueWithLabelBar>

              <Grid gap="4" templateColumns={['1fr', '6.5rem 6.5rem 6.5rem']}>
                <SlackLoginButton
                  isDisabled={isLoading}
                  w={['full', '6.5rem']}
                />
                <GithubLoginButton
                  isDisabled={isLoading}
                  w={['full', '6.5rem']}
                />
                <GoogleLoginButton
                  isDisabled={isLoading}
                  w={['full', '6.5rem']}
                />
              </Grid>
            </Stack>
          </CardBody>
        </Card>
      </VStack>

      <Box p="2" textAlign="center">
        Copyright &copy; {new Date().getFullYear()} coji
      </Box>
    </Grid>
  )
}
