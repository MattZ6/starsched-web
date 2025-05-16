import { app } from "@/constants/app";

type Props = {
  title: string;
}

export function SEO({ title }: Props) {
  const pageTitle = `${title} — ${app.name}`

  return (
    <title>{pageTitle}</title>
  )
}
