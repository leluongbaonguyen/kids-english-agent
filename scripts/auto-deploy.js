import { execSync } from 'child_process';

console.log('🚀 [Auto-Deploy] Starting automated build, commit, and push process...');

try {
  console.log('📦 Step 1: Building production bundle (Vite)...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('📂 Step 2: Staging all modified files, components & database progress...');
  execSync('git add .', { stdio: 'inherit' });

  const commitMsg = `auto(sync): deploy & update system data [${new Date().toISOString()}]`;
  console.log(`📝 Step 3: Committing with message: "${commitMsg}"...`);
  try {
    execSync(`git commit -m "${commitMsg}"`, { stdio: 'inherit' });
  } catch (commitErr) {
    console.log('ℹ️ No new changes to commit.');
  }

  console.log('⬆️ Step 4: Pushing to GitHub (origin main)...');
  execSync('git push origin main', { stdio: 'inherit' });

  console.log('✅ [Auto-Deploy] SUCCESS! Everything is synchronized and deployed automatically.');
} catch (err) {
  console.error('❌ [Auto-Deploy] Error during automated deployment:', err.message);
  process.exit(1);
}
