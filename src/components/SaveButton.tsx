import { Box, Button, ButtonProps } from "@mui/material";
import { useTranslations } from "next-intl";

type SaveButtonProps = ButtonProps;

const SaveButton = (props: SaveButtonProps) => {
  const t = useTranslations("Data");

  return (
    <Button variant="contained" {...props}>
      {t("save")}
    </Button>
  );
};

export default SaveButton;
