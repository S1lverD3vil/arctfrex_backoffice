import { Box, Button, ButtonProps } from "@mui/material";
import { useTranslations } from "next-intl";

type AccountEditButtonProps = ButtonProps & {
  editMode: boolean;
  setEditMode: (v: boolean) => void;
};

const EditButton = ({
  editMode,
  setEditMode,
  ...props
}: AccountEditButtonProps) => {
  const t = useTranslations("Data");

  return (
    <Button
      variant="contained"
      onClick={() => setEditMode(!editMode)}
      {...(editMode && { color: "warning" })}
      {...props}
    >
      {!editMode ? t("edit") : t("cancel")}
    </Button>
  );
};

export default EditButton;
