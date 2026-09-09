# How to edit the site with Claude Code

Open Claude Code in this repository, paste one of these, and follow along.
Each one creates a branch and a pull request. Check the preview link Vercel
posts on the PR, then merge.

## 1. Swap a crew photo

> Replace the photo for Tyler on the team page. The new file is at
> ~/Downloads/tyler.jpg. Save it as public/photos/crew-tyler.jpg, keep the
> alt text and caption in content/team.json accurate, set that member's
> photo to ready, and open a PR.

## 2. Add a review

> Add a new review to content/reviews.json. Quote: "Fixed our water heater
> the same afternoon and cleaned up after." Author initials M.R., city
> St. Peters, source Google, date [today], audience homeowner. Don't mark it
> featured. Open a PR.

## 3. Update hours

> Ryan confirmed hours: Monday to Saturday, 7am to 6pm. Update the hours
> string in content/site.json, leave the emergency line bracketed, and open
> a PR.

## 4. Change a bio

> Update Ryan's bio in content/team.json. He has been in the trade 19 years,
> started the company in 2022, and has lived in O'Fallon since 2010 with his
> wife and two kids. Replace those brackets only. Open a PR.

## 5. Add a project card

> Add a project to content/projects.json: city Wentzville, type Custom home,
> scope "Underground through trim, 3.5 baths, tankless water heater". Photo
> not ready yet, so leave a placeholder photo entry with a caption. Mark it
> featured and unmark the oldest featured project. Open a PR.

## Tips

- Say "show me the preview" and Claude will send screenshots.
- Say "merge it" when you are happy.
- If Claude asks you to confirm a fact, that means it is bracketed. Only
  answer if you know it from Ryan.
