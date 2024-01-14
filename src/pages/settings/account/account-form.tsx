import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
// import { useState } from 'react';

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const profileFormSchema = z.object({
  display_name: z.string().min(2, {
    message: 'Display name must be at least 2 characters.',
  }),
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  profile_picture: z
    .any()
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function AccountForm() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const currentUserDN = useSelector(
    (state: RootState) => state.user.currentUserDN
  );
  const currentUserPFP = useSelector(
    (state: RootState) => state.user.currentUserPFP
  );

  // const [usernameTaken, setUsernameTaken] = useState<boolean>(false);

  // This can come from your database or API.
  const defaultValues: Partial<ProfileFormValues> = {
    display_name: currentUser!,
    username: currentUserDN!,
    profile_picture: currentUserPFP!,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: ProfileFormValues) {
    console.log(data);
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="profile_picture"
          render={({ field: { onChange } }) => (
            <FormItem>
              <div className="flex flex-col md:flex-row gap-10">
                <Avatar className="h-36 w-36">
                  <AvatarImage src={defaultValues.profile_picture} />
                  <AvatarFallback />
                </Avatar>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Input
                    id="picture"
                    type="file"
                    onChange={(event) => {
                      if (event.target.files && event.target.files.length > 0) {
                        onChange(event.target.files[0]);
                      }
                    }}
                  />
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="display_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will also be used for your URL. (Username
                must be unique.)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
