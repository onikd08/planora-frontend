import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserStatusAction } from "./UserStatusAction";
import { getAllUsers } from "@/actions/admin/users.action";
import { RoleFilter } from "./RoleFilter";
import { ChangeRoleDialog } from "./ChangeRoleDialogue";

export const UserManagement = async ({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) => {
  const { role } = await searchParams;
  const result = await getAllUsers(role);
  const users = result.data;

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          User Management
        </h2>
        <RoleFilter />
        <Badge variant="outline">{users?.length || 0} Total Users</Badge>
      </div>

      <div className="overflow-hidden rounded-md border border-border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[250px]">User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead className="px-6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users &&
              users.map((user: any) => (
                <TableRow
                  key={user.id}
                  className="border-border hover:bg-muted/30"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-border">
                        <AvatarImage
                          src={user.profilePhoto}
                          alt={user.firstName}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {user.firstName[0]}
                          {user.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">
                          {user.firstName} {user.lastName}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <ChangeRoleDialog
                      userId={user.id}
                      currentRole={user.role}
                    />
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "ACTIVE" ? "default" : "destructive"
                      }
                      className={
                        user.status === "ACTIVE"
                          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                          : ""
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {user.phone || "N/A"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {user.gender || "N/A"}
                  </TableCell>
                  {user.role !== "ADMIN" && (
                    <TableCell className="px-6 text-right">
                      <UserStatusAction userId={user.id} status={user.status} />
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
