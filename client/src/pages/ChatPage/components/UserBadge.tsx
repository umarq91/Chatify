import { Badge } from "@/components/ui/badge";
import { IoMdClose } from "react-icons/io";
import React from 'react';

interface UserBadgeProps {
  user: any;
  handleDelete: any;
}

const UserBadge: React.FC<UserBadgeProps> = ({  handleDelete, user }) => {
  return (
    <div className="flex items-center">
      <Badge className="flex items-center">
        {user.email}
        <IoMdClose className="ml-2 cursor-pointer" onClick={handleDelete} />
      </Badge>
    </div>
  );
};

export default UserBadge;
