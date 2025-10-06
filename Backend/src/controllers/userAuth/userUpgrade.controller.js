export const upgradeUser = async (req, res, next) => {
  try {
    const { plan, addOns, role } = req.body;
    const userId = req.user.id;

    if (!plan) {
      return res.status(400).json({ message: "Plan is required" });
    }

    // Allowed plans and roles — extend as needed
    const allowedPlans = ["Starter Plan", "Growth Plan", "Custom Plan"];
    const allowedRoles = ["User", "Developer", "Builder", "Broker", "Channel-Partner"];

    if (!allowedPlans.includes(plan)) {
      return res.status(400).json({ message: "Invalid plan selected" });
    }

    // Validate role if provided, else fallback to mapping plan to role
    let newRole;
    if (role) {
      if (!allowedRoles.includes(role)) {
        return res.status(400).json({ message: "Invalid role selected" });
      }
      newRole = role;
    } else {
      // Existing business logic mapping plan to role
      if (plan === "Starter Plan") newRole = "Broker";
      else if (plan === "Growth Plan") newRole = "Builder";
      else if (plan === "Custom Plan") newRole = "Channel-Partner";
      else newRole = "User"; // fallback or default role
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = newRole;
    user.selectedPlan = plan;
    user.addOns = addOns || [];
    user.dashboardAccess = true;

    await user.save();

    res.status(200).json({
      message: "User upgraded successfully",
      user: {
        id: user._id,
        role: user.role,
        selectedPlan: user.selectedPlan,
        addOns: user.addOns,
        dashboardAccess: user.dashboardAccess,
      },
    });
  } catch (error) {
    next(error);
  }
};
