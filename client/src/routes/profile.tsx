import { useParams } from "react-router-dom";

export interface ProfileProps {
  selfProfile?: boolean;
}

export default function Profile(props: ProfileProps) {
  const { selfProfile } = props;
  const userId = useParams<{ userId: string }>().userId;

  return <>Profile</>;
}
