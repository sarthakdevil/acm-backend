import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const teamUpdate = async (req, res, next) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request files:", req.files);

    const {
      name,
      designation,
      linkedin,
      github,
      instagram,

      category,
    } = req.body;

    const year = parseInt(req.body.year);

    const profile_image = req.files?.profile_image?.[0]?.path;

    if (!profile_image) {
      return res
        .status(400)
        .json({ message: "Please upload image required details" });
    }

    const newTeamMember = await prisma.teamUpdate.create({
      data: {
        photoUrl: profile_image,

        name,
        linkedin,
        github,
        instagram,
        year,
        category,
        designation,
      },
    });

    return res.status(200).json({ message: "Added", data: newTeamMember });
  } catch (error) {
    console.error("Error in teamUpdate:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getTeam = async (req, res, next) => {
  const data = await prisma.TeamUpdate.findMany();

  return res.status(200).json({ data });
};
