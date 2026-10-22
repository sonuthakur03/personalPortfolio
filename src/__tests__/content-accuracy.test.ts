import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { initialProfileData } from '../data/profileData';
import { labProjects } from '../data/labProjectsData';
import { initialCertificatesData } from '../data/certificatesData';

describe('Content Accuracy & CV Alignment Protocol', () => {
  const publicDir = path.resolve(__dirname, '../../public');

  it('validates core academic and competitive claims against CV', () => {
    // 1. Academic Rank 1 and CGPA
    expect(initialProfileData.academic).toContain('Rank 1');
    expect(initialProfileData.academic).toContain('3.63');
    expect(initialProfileData.academic).toContain('Tribhuvan University');

    // 2. IdeaX FinTech Track Winner
    expect(initialProfileData.hackathonWin).toContain('IdeaX Hackathon');
    expect(initialProfileData.hackathonWin).toContain('FinTech Track Winner');

    // 3. BugV CTF 3rd Place
    expect(initialProfileData.ctfAchievement).toContain('BugV CTF');
    expect(initialProfileData.ctfAchievement).toContain('3rd Place');
  });

  it('validates all flagship projects have verified assets and architecture blueprints', () => {
    expect(labProjects.length).toBe(7);

    for (const project of labProjects) {
      expect(project.id).toBeTruthy();
      expect(project.name).toBeTruthy();
      expect(project.blueprintId).toBeTruthy();

      // Verify the image file exists in public/
      const imagePath = path.join(publicDir, project.image.replace(/^\//, ''));
      const exists = fs.existsSync(imagePath);
      expect(exists, `Project image for ${project.name} not found at ${imagePath}`).toBe(true);

      // Verify corresponding architecture file exists in public/architectures/
      const archRelPath = project.originalProject?.architectureDiagram?.path
        ? project.originalProject.architectureDiagram.path.replace(/^\//, '')
        : path.join('architectures', `${project.blueprintId.replace('arch-', '')}.html`);
      const archPath = path.join(publicDir, archRelPath);
      const archExists = fs.existsSync(archPath);
      expect(archExists, `Architecture blueprint for ${project.name} not found at ${archPath}`).toBe(true);
    }
  });

  it('validates all certificates in the archival catalog have verified physical scans', () => {
    expect(initialCertificatesData.length).toBeGreaterThanOrEqual(10);

    for (const cert of initialCertificatesData) {
      expect(cert.id).toBeTruthy();
      expect(cert.title).toBeTruthy();
      expect(cert.issuer).toBeTruthy();

      // Verify scanned image exists in public/
      const certImagePath = path.join(publicDir, cert.imageUrl.replace(/^\//, ''));
      const exists = fs.existsSync(certImagePath);
      expect(exists, `Certificate scan for "${cert.title}" missing at ${certImagePath}`).toBe(true);
    }
  });

  it('validates verified technical CV files are physically available in public/cv/', () => {
    expect(initialProfileData.resumeUrl).toBeTruthy();
    const cvPath = path.join(publicDir, (initialProfileData.resumeUrl || '').replace(/^\//, ''));
    expect(fs.existsSync(cvPath), `Official CV PDF not found at ${cvPath}`).toBe(true);

    const requiredCVs = ['Sonu_Thakur_CV.pdf', 'Sonu_Thakur_CV_1page.pdf', 'Sonu_Thakur_CV_2page.pdf'];
    for (const filename of requiredCVs) {
      const p = path.join(publicDir, 'cv', filename);
      expect(fs.existsSync(p), `CV variant ${filename} missing at ${p}`).toBe(true);
      const stat = fs.statSync(p);
      expect(stat.size).toBeGreaterThan(10000);
    }
  });
});
