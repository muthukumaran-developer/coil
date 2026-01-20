# This script will load the Springer template, extract its section layout (margins, page size),
# then apply those layout settings to the user's paper document and save a fixed version.

from docx import Document

template_path = "Springer Paper Template.docx"
paper_path = "Copy of Paper.docx"
output_path = "Paper_Springer_Formatted.docx"

# Load documents
template = Document(template_path)
paper = Document(paper_path)

# Get first section settings from template
t_sec = template.sections[0]

# Apply section layout to all sections in paper
for sec in paper.sections:
    sec.top_margin = t_sec.top_margin
    sec.bottom_margin = t_sec.bottom_margin
    sec.left_margin = t_sec.left_margin
    sec.right_margin = t_sec.right_margin
    sec.page_height = t_sec.page_height
    sec.page_width = t_sec.page_width

# Save output
paper.save(output_path)

output_path
