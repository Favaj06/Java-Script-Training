interface Profile {
  displayName: string;
  bio?: string;
  website?: string;
  avatarUrl?: string;
}

function renderProfile(profile: Profile): string {
  let result = `Name: ${profile.displayName}\n`;

  result += `Bio: ${profile.bio ?? "No bio provided"}\n`;

  if (profile.website) {
    result += `Website: ${profile.website}`;
  }

  return result;
}

const fullProfile: Profile = {
  displayName: "Alice",
  bio: "Frontend Developer",
  website: "https://example.com",
  avatarUrl: "avatar.jpg"
};

const minimalProfile: Profile = {
  displayName: "Bob"
};

console.log(renderProfile(fullProfile));
console.log(renderProfile(minimalProfile));
export {};

// Error:
// Object is possibly 'undefined'.

// Because bio is optional and may not exist.