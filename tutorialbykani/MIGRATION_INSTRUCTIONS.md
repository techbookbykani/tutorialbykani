# GCP ADP Practice Exam Migration Instructions

## Goal
Move the GCP Associate Data Practitioner Practice Exam (24 questions) from the common `[slug].tsx` file to a dedicated standalone file for better organization and maintainability.

## Current State
- **Location:** `src/pages/tutorials/[category]/[slug].tsx`
- **Object key:** `'latest-gcp-adp-google-associate-data-practitioner-practice-exams-tests'`
- **Content lines:** Approximately 10,235 to 20,197 (~10,000 lines)
- **Question count:** 24 questions
- **File ID:** '60'

## Step-by-Step Migration Process

### Step 1: Copy Content
1. Open `src/pages/tutorials/[category]/[slug].tsx`
2. Find line 10,235 where the content starts (after `content: \``)
3. Copy from line 10,235 to line 20,197 (before the closing backtick `,`)
4. This includes:
   - Intro section
   - All 24 questions (Question 1 through Question 24)
   - Closing section

### Step 2: Paste into New File
1. Open `src/pages/tutorials/gcp/gcp-adp-practice-exam.tsx` (already created)
2. Find the `getExamContent()` function
3. Replace the placeholder content with the copied HTML content
4. Ensure the content is wrapped in backticks as a template literal

### Step 3: Remove from [slug].tsx
1. Open `src/pages/tutorials/[category]/[slug].tsx`
2. Find the tutorial object with slug `'latest-gcp-adp-google-associate-data-practitioner-practice-exams-tests'`
3. Delete the entire object (lines ~10,224 to 20,198)
4. **Important:** This will reduce the file size by ~10,000 lines

### Step 4: Update Routes
1. In `[slug].tsx`, find the `getStaticPaths` function
2. Remove this line from the paths array:
   ```tsx
   { params: { category: 'gcp', slug: 'latest-gcp-adp-google-associate-data-practitioner-practice-exams-tests' } },
   ```

### Step 5: Update Navigation
1. In `[slug].tsx`, find the `allTutorials` array at the bottom
2. Remove or update the entry:
   ```tsx
   {
     id: '60',
     title: 'Latest GCP ADP - Google Associate Data Practitioner Practice Exams Tests',
     slug: 'latest-gcp-adp-google-associate-data-practitioner-practice-exams-tests',
     category: 'gcp',
     difficulty: 'Intermediate' as const,
   },
   ```

### Step 6: Add Link to GCP Tutorials Page
Add a special card or link on the GCP category page pointing to `/tutorials/gcp/gcp-adp-practice-exam`

## Verification
After migration, verify:
- [ ] New page loads at `/tutorials/gcp/gcp-adp-practice-exam`
- [ ] All 24 questions display correctly
- [ ] Slide navigation works
- [ ] Old URL `/tutorials/gcp/latest-gcp-adp-google-associate-data-practitioner-practice-exams-tests` returns 404 or redirects
- [ ] File `[slug].tsx` is ~10,000 lines smaller
- [ ] No console errors or TypeScript errors

## Benefits of This Migration
✅ **Better Organization:** Dedicated file for large practice exam  
✅ **Maintainability:** Easier to update and manage 24 questions  
✅ **Performance:** Smaller common [slug].tsx file loads faster  
✅ **Cleaner URL:** `/gcp/gcp-adp-practice-exam` instead of long slug  
✅ **Scalability:** Can add more practice exams as separate files  

## Automated Alternative (If Preferred)
If you want to automate this, I can create a Node.js script that:
1. Reads the content from [slug].tsx
2. Extracts the specific tutorial object
3. Writes it to the new file
4. Removes it from the original file
5. Updates all references

Let me know if you'd like me to create this automation script!
