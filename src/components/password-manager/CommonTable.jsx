import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";

const CommonTable = ({
  tableControl = [],
  caption = "Saved Passwords",
  onEdit,
  onDelete,
}) => {
  return (
    <Table>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">User Name</TableHead>
          <TableHead>Service Name</TableHead>
          <TableHead>Notes</TableHead>
          <TableHead>Site Url</TableHead>
          <TableHead className="text-right">Password</TableHead>
          <TableHead>Edit</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableControl.length > 0 ? (
          tableControl.map((item, index) => (
            <PasswordRow
              key={item.id || index}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="text-center text-gray-500">
              No records found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

const PasswordRow = ({ item, onEdit, onDelete }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TableRow>
      <TableCell className="font-medium">{item.username}</TableCell>
      <TableCell>{item.serviceName}</TableCell>
      <TableCell>{item.notes}</TableCell>

      <TableCell>
        <a
          href={item.siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline hover:text-blue-600"
        >
          {item.siteUrl}
        </a>
      </TableCell>

      <TableCell className="text-right">
        <div className="flex justify-end items-center gap-2">
          <span className="font-mono inline-block min-w-[120px]">
            {showPassword
              ? item.password
              : "•".repeat(item.password?.length || 8)}
          </span>
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-sm text-blue-500 hover:underline"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </TableCell>

      <TableCell className="w-[100px]">
        <Button onClick={() => onEdit?.(item)}>Edit</Button>
      </TableCell>
      <TableCell className="w-[100px]">
        <Button variant='outline' onClick={() => onDelete?.(item.id)}>Delete</Button>
      </TableCell>
    </TableRow>
  );
};

export default CommonTable;
