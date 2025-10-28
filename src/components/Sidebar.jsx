import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Typography,
  Divider,
  Avatar,
  Badge,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  WbSunny as TodayIcon,
  Star as ImportantIcon,
  Assignment as PlannedIcon,
  Person as PersonIcon,
  Home as HomeIcon,
  Add as AddIcon,
} from "@mui/icons-material";

export default function Sidebar({ open, onClose, onToggle, remaining, user }) {
  const [selectedItem, setSelectedItem] = useState("today");

  const menuItems = [
    {
      id: "today",
      label: "오늘 할 일",
      icon: <TodayIcon />,
      badge: user ? remaining : null,
    },
    {
      id: "important",
      label: "중요",
      icon: <ImportantIcon />,
      badge: null,
    },
    {
      id: "planned",
      label: "계획된 일정",
      icon: <PlannedIcon />,
      badge: null,
    },
    {
      id: "profile",
      label: "나에게 할당됨",
      icon: <PersonIcon />,
      badge: null,
    },
    {
      id: "tasks",
      label: "작업",
      icon: <HomeIcon />,
      badge: user ? remaining : null,
    },
  ];

  const handleItemClick = (itemId) => {
    setSelectedItem(itemId);
    // 여기에 각 메뉴 항목에 대한 로직을 추가할 수 있습니다
  };

  return (
    <>
      {/* 삼선 메뉴 버튼 */}
      <IconButton
        onClick={onToggle}
        sx={{
          position: "fixed",
          top: 20,
          left: 20,
          zIndex: 1,
          bgcolor: "background.paper",
          "&:hover": {
            bgcolor: "action.hover",
          },
          boxShadow: 3,
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* 사이드바 드로어 */}
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: 280,
            bgcolor: "background.default",
            borderRight: "1px solid rgba(255, 255, 255, 0.12)",
          },
        }}
      >
        <Box sx={{ width: 280, height: "100%" }}>
          {/* 헤더 */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
              borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              To Do
            </Typography>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          {/* 메뉴 리스트 */}
          <List sx={{ pt: 1 }}>
            {menuItems.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  selected={selectedItem === item.id}
                  onClick={() => handleItemClick(item.id)}
                  sx={{
                    mx: 1,
                    borderRadius: 2,
                    "&.Mui-selected": {
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      "&:hover": {
                        bgcolor: "primary.dark",
                      },
                    },
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: selectedItem === item.id ? "inherit" : "inherit",
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontSize: "0.9rem",
                        fontWeight: selectedItem === item.id ? 600 : 400,
                      },
                    }}
                  />
                  {item.badge && (
                    <Badge
                      badgeContent={item.badge}
                      color="secondary"
                      sx={{
                        "& .MuiBadge-badge": {
                          bgcolor:
                            selectedItem === item.id
                              ? "rgba(255,255,255,0.8)"
                              : "primary.main",
                          color:
                            selectedItem === item.id ? "primary.main" : "white",
                          fontWeight: 600,
                        },
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 1, mx: 2 }} />

          {/* 새 목록 추가 버튼 */}
          <List>
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  mx: 1,
                  borderRadius: 2,
                  color: "primary.main",
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "primary.main", minWidth: 40 }}>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText
                  primary="새 목록"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: "0.9rem",
                      color: "primary.main",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>

          {/* 하단 사용자 정보 */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
              borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            }}
          >
            {user ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
                  {user.nickname.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {user.nickname}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    로그인됨
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: "grey.600" }}>
                  <PersonIcon />
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    게스트
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    로그인이 필요합니다
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
