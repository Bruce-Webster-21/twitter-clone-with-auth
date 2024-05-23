// https://date-fns.org/
import { format } from "date-fns";
import { useMemo } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }

    return format(new Date(fetchedUser.createdAt), "MMMM yyyy");
  }, [fetchedUser?.createdAt]);
  return <div></div>;
};

export default UserBio;
