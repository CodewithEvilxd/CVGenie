'use client';

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Link,
} from '@react-pdf/renderer';

// take a look

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
    color: '#000',
  },
  header: {
    marginBottom: 15,
  },
  headerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 12,
    marginBottom: 4,
    color: '#444',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  paragraph: {
    marginBottom: 4,
  },
  socialLink: {
    marginRight: 8,
    color: '#0066cc',
    textDecoration: 'underline',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    marginRight: 10,
  },
  icon: {
    marginRight: 4,
  },
});

export const ResumePDF = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerName}>{data.name}</Text>
        <Text style={styles.headerTitle}>{data.title}</Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {data.linkedin && (
            <Link src={`https://${data.linkedin}`} style={styles.socialLink}>
              LinkedIn
            </Link>
          )}
          {data.github && (
            <Link src={`https://${data.github}`} style={styles.socialLink}>
              GitHub
            </Link>
          )}
          {data.twitter && (
            <Link src={`https://${data.twitter}`} style={styles.socialLink}>
              Twitter
            </Link>
          )}
        </View>
      </View>

      {data.skills?.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Skills</Text>
          {data.skills.map((skill: any, index: number) => (
            <Text key={index} style={styles.paragraph}>
              {skill.category}: {skill.items}
            </Text>
          ))}
        </View>
      )}

      {data.education?.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu: any, i: number) => (
            <Text key={i} style={styles.paragraph}>
              {edu.degree}, {edu.institute} ({edu.duration}) - Score: {edu.score}
            </Text>
          ))}
        </View>
      )}

      {data.experience?.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experience.map((exp: any, i: number) => (
            <View key={i}>
              <Text style={styles.paragraph}>
                {exp.role} @ {exp.organization} ({exp.duration})
              </Text>
              {exp.points.map((pt: string, index: number) => (
                <Text key={index} style={{ marginLeft: 8 }}>
                  • {pt}
                </Text>
              ))}
            </View>
          ))}
        </View>
      )}

      {data.projects?.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Projects</Text>
          {data.projects.map((proj: any, i: number) => (
            <View key={i}>
              <Text style={styles.paragraph}>{proj.title}</Text>
              {proj.github && (
                <Link src={`https://${proj.github}`} style={styles.socialLink}>
                  GitHub
                </Link>
              )}
              {proj.points.map((pt: string, index: number) => (
                <Text key={index} style={{ marginLeft: 8 }}>
                  • {pt}
                </Text>
              ))}
            </View>
          ))}
        </View>
      )}

      {data.achievement?.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Achievements</Text>
          {data.achievement.map((ach: any, i: number) => (
            <Text key={i} style={styles.paragraph}>
              • {ach.items}
            </Text>
          ))}
        </View>
      )}

      {data.email && (
        <View>
          <Text style={styles.sectionTitle}>Contact</Text>
          <Link src={`mailto:${data.email}`} style={styles.socialLink}>
            {data.email}
          </Link>
        </View>
      )}
    </Page>
  </Document>
);
