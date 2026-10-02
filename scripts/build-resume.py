"""Generate the one-page portfolio resume; source facts: supplied October 2026 resume and public project READMEs."""
from pathlib import Path
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_RIGHT
root=Path(__file__).resolve().parents[1]
output=root/'public/resume/leeon-israel.pdf'
ink=colors.HexColor('#1d1d1f'); muted=colors.HexColor('#565e68'); blue=colors.HexColor('#0066cc')
styles={
 'name':ParagraphStyle('name',fontName='Helvetica-Bold',fontSize=25,leading=28,textColor=ink,spaceAfter=4),
 'subtitle':ParagraphStyle('subtitle',fontName='Helvetica',fontSize=10,leading=14,textColor=muted,spaceAfter=5),
 'contact':ParagraphStyle('contact',fontName='Helvetica',fontSize=8.4,leading=12,textColor=blue,spaceAfter=11),
 'section':ParagraphStyle('section',fontName='Helvetica-Bold',fontSize=10.5,leading=14,textColor=blue,spaceBefore=10,spaceAfter=6),
 'role':ParagraphStyle('role',fontName='Helvetica-Bold',fontSize=9.6,leading=12,textColor=ink),
 'date':ParagraphStyle('date',fontName='Helvetica',fontSize=8.2,leading=12,textColor=muted,alignment=TA_RIGHT),
 'body':ParagraphStyle('body',fontName='Helvetica',fontSize=9,leading=12.2,textColor=ink,spaceAfter=3),
 'bullet':ParagraphStyle('bullet',fontName='Helvetica',fontSize=9,leading=12.2,textColor=ink,leftIndent=9,firstLineIndent=-9,spaceAfter=3),
}
flow=[]
def p(s,style='body'):return Paragraph(s,styles[style])
def section(s):flow.append(p(s,'section'))
def role(company,title,dates,bullets):
 row=Table([[p(company+' | '+title,'role'),p(dates,'date')]],colWidths=[376,144]);row.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),0),('TOPPADDING',(0,0),(-1,-1),0),('BOTTOMPADDING',(0,0),(-1,-1),4)]))
 flow.append(KeepTogether([row]+[p('• '+b,'bullet') for b in bullets]+[Spacer(1,5)]))
flow.extend([p('Leeon Israel','name'),p('AI engineer &amp; product builder | New York, NY','subtitle'),p('<link href="mailto:leeoniisrael@gmail.com">leeoniisrael@gmail.com</link>  |  (843) 995-8888  |  <link href="https://leeonisrael.com">leeonisrael.com</link><br/><link href="https://linkedin.com/in/leeoniisrael">linkedin.com/in/leeoniisrael</link>  |  <link href="https://github.com/LeeoniIsrael">github.com/LeeoniIsrael</link>','contact')])
section('Experience')
role('UBS','Forward Deployed AI Engineer','Aug 2026 - Present',[
'Translate client needs into AI product roadmaps and feature redesigns across three teams in applied AI, data, and enterprise tooling.',
'Build a Python agent harness for model calls, tool execution, and task context; prepare wealth-management data with Databricks, Denodo, Java, and Azure.'
])
role('Qatalyst Health','Founding Engineer','Nov 2024 - Aug 2026',[
'Built a clinical reimbursement engine with 10 Gemini detection functions and a Django document pipeline with interactive highlighting and user edits.',
'Reduced care-plan review from days to 20 minutes with an LLM-as-a-judge evaluation system achieving 94% recall for clinical inaccuracies.',
'Designed a CI/CD transformation targeting 60% smaller images, with SHA-tagged releases, automated security gates, and multi-stage Docker builds.'
])
role('USC AI Institute','AI Research Intern','Jan 2023 - Jan 2026',[
'Co-authored <b>KiMO: Knowledge-infused Multi-agent Orchestrator</b>, accepted at AAMAS 2026; developed a two-stage pipeline with planning ontologies and agent registries.',
'Improved Q&amp;A accuracy by 60% with LangChain and LlamaIndex RAG models. Built an NLP pipeline over 10,000+ data points, achieving 85% accuracy and 83% F1.'
])
role('UBS','Software Engineering Intern','Jun 2025 - Aug 2025',[
'Built Python and Java MCP servers for agent-driven data discovery; led a news-based market-risk prediction prototype presented to the company CTO.',
'Cut resume-screening time by 95% with a React, LangChain, and Azure SQL team-matching platform; reduced dataset testing time by 80%+ with automated data generation.'
])
role('John Deere','AI Engineering Intern','May 2024 - Aug 2024',[
'Lowered indexing effort by 70%+ and expedited user support by 75%+ through Python, LangChain, and RAG automation; maintained current OpenSearch vector-store data.'
])
section('Selected projects')
flow.append(p('<b>Kavanah</b> - Local-first prayer companion for iOS and Android with offline reading, on-device prayer times, and optional AI assistance. React Native, Expo, TypeScript. In development.'))
flow.append(p('<b>APEX Weather</b> - Weather-market research and paper-trading system with settlement parsing, Monte Carlo simulation, risk controls, and SQLite audit records. Python.'))
section('Education')
flow.append(p('<b>University of South Carolina</b> | B.S. Computer Science | May 2026'))
flow.append(p('Minor: Business Information Management | <b>Major GPA: 4.0/4.0</b> | Dean’s List 7x | First-Generation Scholar'))
section('Product & technical skills')
flow.append(p('<b>Product:</b> Requirements analysis, roadmap planning, feature scoping, prototyping, product demos, Agile/Scrum'))
flow.append(p('<b>Engineering:</b> Python, Java, JavaScript, TypeScript, SQL, React, Django, REST APIs, agent orchestration'))
flow.append(p('<b>AI, data &amp; cloud:</b> LangChain, LlamaIndex, RAG, AI evaluation, Databricks, Denodo, Azure, AWS, MongoDB, OpenSearch'))
def footer(c,d):
 c.setTitle('Leeon Israel - Resume');c.setAuthor('Leeon Israel')
doc=SimpleDocTemplate(str(output),pagesize=(612,792),rightMargin=40,leftMargin=40,topMargin=30,bottomMargin=28)
doc.build(flow,onFirstPage=footer,onLaterPages=footer)
from pypdf import PdfReader
count=len(PdfReader(output).pages)
print(f'{output}: {count} page(s)')
if count!=1:raise RuntimeError('Resume must fit one page')
